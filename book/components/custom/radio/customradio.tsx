import { Radio } from "@nextui-org/radio";
import { cn } from "@nextui-org/theme";

export function CustomRadio({
  children,
  value,
}: {
  children: React.ReactNode;
  value: string;
}) {
  return (
    <Radio
      value={value}
      classNames={{
        base: cn(
          "w-full inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between",
          "flex-row-reverse max-w-[10000px] cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent",
          "data-[selected=true]:border-primary"
        ),
      }}
    >
      {children}
    </Radio>
  );
}
