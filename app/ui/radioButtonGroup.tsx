{/* <div className="mb-4">
                    <RadioButtonGroup
                        label="This book can be loaned?"
                        options={loandValue}
                        onChange={radioGroupHandler}
                    />
                </div> */}

import { RadioButton } from '@/app/ui/radioButton';

interface IOption {
    label: string;
    name?: string;
    disabled?: boolean;
}
interface IOptionGroup {
    label: string;
    options: IOption[];
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
interface RenderOptionsProps {
    options: IOption[];
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RenderOptions = ({ options, onChange }: RenderOptionsProps) => {
    return options.map(({ label, name, disabled }, index) => {
        const optionId = `radio-option-${label.replace(/\s+/g, "")}`;

        return (
            <RadioButton
                value={label}
                label={label}
                key={optionId}
                id={optionId}
                name={name}
                disabled={disabled}
                defaultChecked={index === 0}
                onChange={onChange}
            />
        );
    });
};

interface RadioButtonGroupProps extends IOptionGroup {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

 export function RadioButtonGroup({label, options, onChange}: RadioButtonGroupProps) {
    return(
        <fieldset className="border-none">
            <legend className="font-medium text-sm">{label}</legend>
            <div className="grid grid-cols-5 gap-5 p-2">
                <RenderOptions options={options} onChange={onChange} />
            </div>
        </fieldset>
    );
 };
