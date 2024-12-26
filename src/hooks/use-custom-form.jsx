import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
  CommandGroup,
} from "@/components/ui/command";
import { ScrollArea } from "@/components/ui/scroll-area";

const useCustomForm = ({ defaultValues = {} }) => {
  const form = useForm({
    defaultValues,
  });

  const { handleSubmit, control, ...props } = form;

  const FormWrapper = ({ children, onSubmit, onError, className }) => (
    <Form {...form}>
      <form
        className={cn("h-full w-full", className)}
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        {children}
      </form>
    </Form>
  );

  const FormInput = ({
    title,
    placeholder,
    description,
    id,
    type,
    className,
  }) => (
    <FormField
      control={control}
      name={id}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{title}</FormLabel>
          <FormControl>
            <Input
              className={className}
              type={type}
              placeholder={placeholder}
              {...field}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );

  const FormCheckbox = ({ title, id }) => (
    <FormField
      control={control}
      name={id}
      render={({ field }) => (
        <FormItem className="inline-flex items-center gap-4">
          <FormControl>
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          <FormLabel>{title}</FormLabel>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  const FormRadioGroup = ({ title, id, options }) => (
    <FormField
      control={control}
      name={id}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{title}</FormLabel>
          <RadioGroup
            className="flex flex-col gap-8"
            value={field.value}
            onValueChange={field.onChange}
          >
            {options.map((option) => (
              <div className="flex items-center space-x-2">
                <RadioGroupItem key={option.value} value={option.value} />
                <Label htmlFor={option.value}>{option.label}</Label>
              </div>
            ))}
          </RadioGroup>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  const FormSelect = ({ title, id, options }) => (
    <FormField
      control={control}
      name={id}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{title}</FormLabel>
          <FormControl>
            <Select
              value={field.value}
              onValueChange={(value) => field.onChange(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  const FormSwitch = ({ title, id }) => (
    <FormField
      control={control}
      name={id}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{title}</FormLabel>
          <FormControl>
            <Switch checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  const FormTextarea = ({ title, placeholder, id }) => (
    <FormField
      control={control}
      name={id}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{title}</FormLabel>
          <FormControl>
            <Textarea placeholder={placeholder} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  const FormSlider = ({ title, id, min, max, step = 1 }) => (
    <FormField
      control={control}
      name={id}
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel>{title}</FormLabel>
            <FormControl>
              <Slider
                min={min}
                max={max}
                step={step}
                value={field.value || [min, max]} // Default to min value if no value is set
                onValueChange={field.onChange} // Pass updated value to form
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );

  const FormCommand = ({ title, id, options }) => (
    <FormField
      control={control}
      name={id}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{title}</FormLabel>
          <FormControl>
            <Command>
              <CommandInput
                placeholder="Search or command"
                value={field.value}
                onValueChange={field.onChange}
              />
                <CommandList>
              
                  <CommandGroup heading="Locations">
                    {options.map((option) => (
                      <CommandItem
                        key={option.value}
                        onSelect={() => field.onChange(option.value)}
                      >
                        {option.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
            </Command>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  return {
    FormWrapper,
    FormInput,
    FormCheckbox,
    FormRadioGroup,
    FormSelect,
    FormSwitch,
    FormTextarea,
    FormSlider,
    FormCommand,
    ...props,
  };
};

export default useCustomForm;
