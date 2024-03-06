"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

const valueMapping: Record<number, number> = {
  0: 18,
  1: 25,
  2: 35,
  3: 45,
  4: 55,
  5: 65,
};

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => {
  const [mappedValues, setMappedValues] = React.useState(() =>
    props.defaultValue !== undefined
      ? [valueMapping[Math.round(props.defaultValue[0] ?? 0)]]
      : [0]
  );
  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn(
        "relative flex w-full touch-none select-none items-center",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20">
        <SliderPrimitive.Range className="absolute h-full bg-primary" />
      </SliderPrimitive.Track>
      {/* <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
         <div className="text-white absolute left-1/2 top-7 h-4 w-fit -translate-x-1/2 text-center text-xs">
            {mappedValues[0]}
          </div>
        </SliderPrimitive.Thumb > */}
      <SliderPrimitive.Thumb
        className="block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
        aria-label="Volume"
      >
        {/* <div className=" absolute left-1/2 top-7 text h-4 w-fit -translate-x-1/2 text-center text-xs">
          {mappedValues[0]}
        </div> */}
      </SliderPrimitive.Thumb>
    </SliderPrimitive.Root>
  );
});
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
