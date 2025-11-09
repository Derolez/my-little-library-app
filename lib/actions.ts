'use server';

import Book from '@/models/bookModel';
import User from '@/models/userModel';
import Member from '@/models/memberModel';
import mongoose from 'mongoose';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { connectToMongoDB } from './db';
import { bookFormSchema, signupFormSchema, loginFormSchema, memberFormSchema, type ActionResult } from './validations';
import { createSession, deleteSession } from './auth';
import { login } from './auth-db';
import bcrypt from 'bcryptjs';

//---------------------------------------
// book actions section
//---------------------------------------
// Book Create Action
export const createBooks = async (formData: FormData): Promise<ActionResult> => {
    await connectToMongoDB();
    
    // Extract and validate form data
    const rawData = {
        title: formData.get("title"),
        author: formData.get("author"),
        editionName: formData.get("editionName"),
        yearOfPublication: formData.get("yearOfPublication"),
        ean13: formData.get("ean13"),
        copyNum: formData.get("copyNum"),
        loanableStatus: formData.get("loanableStatus"),
        summary: formData.get("summary"),
        coverURL: formData.get("coverURL"),
        genre: formData.get("genre"),
    };

    const validationResult = bookFormSchema.safeParse(rawData);
    
    if (!validationResult.success) {
        return {
            success: false,
            error: 'Validation failed',
            fieldErrors: validationResult.error.flatten().fieldErrors as Record<string, string[]>,
        };
    }
    
    try {
        const validatedData = validationResult.data;
        
        // Convert genre string to ObjectId if provided
        const genreId = validatedData.genre && validatedData.genre.trim() !== '' 
            ? new mongoose.Types.ObjectId(validatedData.genre) 
            : undefined;
        
        const newBook = await Book.create({
            title: validatedData.title,
            author: validatedData.author,
            editionName: validatedData.editionName,
            yearOfPublication: validatedData.yearOfPublication ? new Date(validatedData.yearOfPublication, 0, 1) : undefined,
            ean13: validatedData.ean13,
            copyNum: validatedData.copyNum,
            loanableStatus: validatedData.loanableStatus,
            summary: validatedData.summary,
            coverURL: validatedData.coverURL || undefined,
            genre: genreId,
        });
        
        revalidatePath("/dashboard/books");
        return { success: true, data: String(newBook._id) };
    } catch {
        return {
            success: false,
            error: 'Database Error: Failed to Create Book in MyLittleLibrary.',
        };
    }
};
//---------------------------------------
// Book Edit Action
export const updateBookById = async (id: string, formData: FormData): Promise<ActionResult> => {
    await connectToMongoDB();
    
    // Extract and validate form data
    const rawData = {
        title: formData.get("title"),
        author: formData.get("author"),
        editionName: formData.get("editionName"),
        yearOfPublication: formData.get("yearOfPublication"),
        ean13: formData.get("ean13"),
        copyNum: formData.get("copyNum"),
        loanableStatus: formData.get("loanableStatus"),
        summary: formData.get("summary"),
        coverURL: formData.get("coverURL"),
        genre: formData.get("genre"),
    };

    const validationResult = bookFormSchema.safeParse(rawData);
    
    if (!validationResult.success) {
        return {
            success: false,
            error: 'Validation failed',
            fieldErrors: validationResult.error.flatten().fieldErrors as Record<string, string[]>,
        };
    }
    
    try {
        const validatedData = validationResult.data;
        
        // Convert genre string to ObjectId if provided
        const genreId = validatedData.genre && validatedData.genre.trim() !== '' 
            ? new mongoose.Types.ObjectId(validatedData.genre) 
            : undefined;
        
        const updateResult = await Book.updateOne(
            { _id: id },
            {
                title: validatedData.title,
                author: validatedData.author,
                editionName: validatedData.editionName,
                yearOfPublication: validatedData.yearOfPublication ? new Date(validatedData.yearOfPublication, 0, 1) : undefined,
                ean13: validatedData.ean13,
                copyNum: validatedData.copyNum,
                loanableStatus: validatedData.loanableStatus,
                summary: validatedData.summary,
                coverURL: validatedData.coverURL || undefined,
                genre: genreId,
            }
        );
        
        if (updateResult.matchedCount === 0) {
            return {
                success: false,
                error: 'Book not found',
            };
        }
        
        revalidatePath("/dashboard/books");
        return { success: true, data: 'book updated' };
    } catch {
        return {
            success: false,
            error: 'Database Error: Failed to update book',
        };
    }
};
//---------------------------------------
// Book Delete Action
export const deleteBook = async (id: string): Promise<ActionResult> => {
    await connectToMongoDB();
    
    try {
        const deleteResult = await Book.deleteOne({ _id: id });
        
        if (deleteResult.deletedCount === 0) {
            return {
                success: false,
                error: 'Book not found',
            };
        }
        
        revalidatePath("/dashboard/books");
        return { success: true, data: 'book deleted' };
    } catch {
        return {
            success: false,
            error: 'Database Error: Failed to delete book',
        };
    }
};

//---------------------------------------
// Book Delete Action (FormData wrapper)
export const deleteBookFromForm = async (formData: FormData): Promise<ActionResult> => {
    const id = formData.get('id');
    
    if (!id || typeof id !== 'string') {
        return {
            success: false,
            error: 'Book ID is required',
        };
    }
    
    return deleteBook(id);
};

//---------------------------------------
// Book Delete Action (FormData wrapper for form actions - returns void)
export const deleteBookAction = async (formData: FormData): Promise<void> => {
    const id = formData.get('id');
    
    if (!id || typeof id !== 'string') {
        return;
    }
    
    await deleteBook(id);
};

//---------------------------------------
// auth actions section
//---------------------------------------
// Signup Action
export const signup = async (formData: FormData): Promise<ActionResult> => {
    await connectToMongoDB();
    
    // Extract and validate form data
    const rawData = {
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
    };

    const validationResult = signupFormSchema.safeParse(rawData);
    
    if (!validationResult.success) {
        return {
            success: false,
            error: 'Validation failed',
            fieldErrors: validationResult.error.flatten().fieldErrors as Record<string, string[]>,
        };
    }
    
    try {
        const validatedData = validationResult.data;
        
        // Check if user already exists
        const existingUser = await User.findOne({ email: validatedData.email });
        if (existingUser) {
            return {
                success: false,
                error: 'Email already registered',
            };
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(validatedData.password, 10);
        
        // Create user
        const newUser = await User.create({
            name: validatedData.name,
            email: validatedData.email,
            password: hashedPassword,
        });
        
        // Create session
        await createSession(String(newUser._id));
        
        return { success: true, data: 'User created successfully' };
    } catch {
        return {
            success: false,
            error: 'Database Error: Failed to create user.',
        };
    }
};

//---------------------------------------
// Login Action
export const authenticate = async (formData: FormData): Promise<ActionResult> => {
    // Extract and validate form data
    const rawData = {
        email: formData.get("email"),
        password: formData.get("password"),
    };

    const validationResult = loginFormSchema.safeParse(rawData);
    
    if (!validationResult.success) {
        return {
            success: false,
            error: 'Validation failed',
            fieldErrors: validationResult.error.flatten().fieldErrors as Record<string, string[]>,
        };
    }
    
    try {
        const validatedData = validationResult.data;
        const user = await login(validatedData.email, validatedData.password);
        
        if (!user) {
            return {
                success: false,
                error: 'Invalid email or password',
            };
        }
        
        // Create session
        await createSession(user.id);
        
        return { success: true, data: 'Login successful' };
    } catch {
        return {
            success: false,
            error: 'Failed to authenticate user.',
        };
    }
};

//---------------------------------------
// Logout Action
export const logout = async (): Promise<void> => {
    await deleteSession();
    redirect('/login');
};

//---------------------------------------
// member actions section
//---------------------------------------
// Member Create Action
export const createMember = async (formData: FormData): Promise<ActionResult> => {
    await connectToMongoDB();
    
    const rawData = {
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        address: formData.get("address"),
    };

    const validationResult = memberFormSchema.safeParse(rawData);
    
    if (!validationResult.success) {
        return {
            success: false,
            error: 'Validation failed',
            fieldErrors: validationResult.error.flatten().fieldErrors as Record<string, string[]>,
        };
    }
    
    try {
        const validatedData = validationResult.data;
        
        // Check if member already exists
        const existingMember = await Member.findOne({ email: validatedData.email });
        if (existingMember) {
            return {
                success: false,
                error: 'Email already registered',
            };
        }
        
        const newMember = await Member.create({
            name: validatedData.name,
            email: validatedData.email,
            phone: validatedData.phone,
            address: validatedData.address,
        });
        
        revalidatePath("/dashboard/members");
        return { success: true, data: String(newMember._id) };
    } catch {
        return {
            success: false,
            error: 'Database Error: Failed to Create Member in MyLittleLibrary.',
        };
    }
};

//---------------------------------------
// Member Edit Action
export const updateMemberById = async (id: string, formData: FormData): Promise<ActionResult> => {
    await connectToMongoDB();
    
    const rawData = {
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        address: formData.get("address"),
    };

    const validationResult = memberFormSchema.safeParse(rawData);
    
    if (!validationResult.success) {
        return {
            success: false,
            error: 'Validation failed',
            fieldErrors: validationResult.error.flatten().fieldErrors as Record<string, string[]>,
        };
    }
    
    try {
        const validatedData = validationResult.data;
        
        // Check if email is already used by another member
        const existingMember = await Member.findOne({ 
            email: validatedData.email,
            _id: { $ne: id }
        });
        if (existingMember) {
            return {
                success: false,
                error: 'Email already registered to another member',
            };
        }
        
        const updateResult = await Member.updateOne(
            { _id: id },
            {
                name: validatedData.name,
                email: validatedData.email,
                phone: validatedData.phone,
                address: validatedData.address,
            }
        );
        
        if (updateResult.matchedCount === 0) {
            return {
                success: false,
                error: 'Member not found',
            };
        }
        
        revalidatePath("/dashboard/members");
        return { success: true, data: 'member updated' };
    } catch {
        return {
            success: false,
            error: 'Database Error: Failed to update member',
        };
    }
};

//---------------------------------------
// Member Delete Action
export const deleteMember = async (id: string): Promise<ActionResult> => {
    await connectToMongoDB();
    
    try {
        const deleteResult = await Member.deleteOne({ _id: id });
        
        if (deleteResult.deletedCount === 0) {
            return {
                success: false,
                error: 'Member not found',
            };
        }
        
        revalidatePath("/dashboard/members");
        return { success: true, data: 'member deleted' };
    } catch {
        return {
            success: false,
            error: 'Database Error: Failed to delete member',
        };
    }
};

//---------------------------------------
// Member Delete Action (FormData wrapper)
export const deleteMemberAction = async (formData: FormData): Promise<void> => {
    const id = formData.get('id');
    
    if (!id || typeof id !== 'string') {
        return;
    }
    
    await deleteMember(id);
};
