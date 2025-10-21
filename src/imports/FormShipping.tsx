import svgPaths from "./svg-o2iwl47y9y";

function Text() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Text">
      <p className="font-['Inter:Regular',_sans-serif] font-normal leading-[1.4] not-italic relative shrink-0 text-[#757575] text-[16px] text-nowrap whitespace-pre">We ship within 2 working days</p>
    </div>
  );
}

function Legend() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Legend">
      <p className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[1.2] min-w-full not-italic relative shrink-0 text-[#1e1e1e] text-[24px] tracking-[-0.48px] w-[min-content]">Shipping information</p>
      <Text />
    </div>
  );
}

function Input() {
  return (
    <div className="bg-white min-w-[240px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row items-center min-w-inherit overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex items-center min-w-inherit px-[16px] py-[12px] relative w-full">
          <p className="basis-0 font-['Inter:Regular',_sans-serif] font-normal grow leading-none min-h-px min-w-px not-italic relative shrink-0 text-[#b3b3b3] text-[16px]">Value</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d9d9d9] border-solid inset-[-0.5px] pointer-events-none rounded-[8.5px]" />
    </div>
  );
}

function InputField() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Input Field">
      <p className="font-['Inter:Regular',_sans-serif] font-normal leading-[1.4] min-w-full not-italic relative shrink-0 text-[#1e1e1e] text-[16px] w-[min-content]">Full Name</p>
      <Input />
    </div>
  );
}

function ChevronDown() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Chevron down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Chevron down">
          <path d="M4 6L8 10L12 6" id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
        </g>
      </svg>
    </div>
  );
}

function Select() {
  return (
    <div className="bg-white h-[40px] min-w-[240px] relative rounded-[8px] shrink-0 w-full" data-name="Select">
      <div aria-hidden="true" className="absolute border border-[#d9d9d9] border-solid inset-[-0.5px] pointer-events-none rounded-[8.5px]" />
      <div className="flex flex-row items-center min-w-inherit size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[40px] items-center min-w-inherit pl-[16px] pr-[12px] py-[12px] relative w-full">
          <p className="basis-0 font-['Inter:Regular',_sans-serif] font-normal grow leading-none min-h-px min-w-px not-italic relative shrink-0 text-[#1e1e1e] text-[16px]">Value</p>
          <ChevronDown />
        </div>
      </div>
    </div>
  );
}

function SelectField() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Select Field">
      <p className="font-['Inter:Regular',_sans-serif] font-normal leading-[1.4] min-w-full not-italic relative shrink-0 text-[#1e1e1e] text-[16px] w-[min-content]">Location</p>
      <Select />
    </div>
  );
}

function Textarea() {
  return (
    <div className="bg-white min-h-[80px] min-w-[240px] relative rounded-[8px] shrink-0 w-full" data-name="Textarea">
      <div className="min-h-inherit min-w-inherit overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex items-start min-h-inherit min-w-inherit px-[16px] py-[12px] relative w-full">
          <p className="basis-0 font-['Inter:Regular',_sans-serif] font-normal grow leading-[1.4] min-h-px min-w-px not-italic relative shrink-0 text-[#b3b3b3] text-[16px]">Value</p>
          <div className="absolute bottom-[6.02px] right-[5.02px] size-[6.627px]" data-name="Drag">
            <div className="absolute inset-[-5.33%]" style={{ "--stroke-0": "rgba(179, 179, 179, 1)" } as React.CSSProperties}>
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
                <path d={svgPaths.p6595600} id="Drag" stroke="var(--stroke-0, #B3B3B3)" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d9d9d9] border-solid inset-[-0.5px] pointer-events-none rounded-[8.5px]" />
    </div>
  );
}

function TextareaField() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Textarea Field">
      <p className="font-['Inter:Regular',_sans-serif] font-normal leading-[1.4] not-italic relative shrink-0 text-[#1e1e1e] text-[16px] w-full">Delivery note</p>
      <Textarea />
    </div>
  );
}

function Check() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Check">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Check">
          <path d={svgPaths.p39be50} id="Icon" stroke="var(--stroke-0, #EDEBFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
        </g>
      </svg>
    </div>
  );
}

function Checkbox() {
  return (
    <div className="bg-[#090058] content-stretch flex gap-[10px] items-center justify-center overflow-clip relative rounded-[4px] shrink-0 size-[16px]" data-name="Checkbox">
      <Check />
    </div>
  );
}

function CheckboxAndLabel() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="Checkbox and Label">
      <Checkbox />
      <p className="basis-0 font-['Inter:Regular',_sans-serif] font-normal grow leading-[1.4] min-h-px min-w-px not-italic relative shrink-0 text-[#1e1e1e] text-[16px]">I accept the terms</p>
    </div>
  );
}

function Space() {
  return <div className="shrink-0 size-[16px]" data-name="Space" />;
}

function DescriptionRow() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="Description Row">
      <Space />
      <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] basis-0 decoration-solid font-['Inter:Regular',_sans-serif] font-normal grow leading-[1.4] min-h-px min-w-px not-italic relative shrink-0 text-[#757575] text-[16px] underline">{`Read our T&Cs`}</p>
    </div>
  );
}

function CheckboxField() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Checkbox Field">
      <CheckboxAndLabel />
      <DescriptionRow />
    </div>
  );
}

function Button1() {
  return (
    <div className="basis-0 bg-[#090058] grow min-h-px min-w-px relative rounded-[8px] shrink-0" data-name="Button">
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex gap-[8px] items-center justify-center p-[12px] relative w-full">
          <p className="font-['Inter:Regular',_sans-serif] font-normal leading-none not-italic relative shrink-0 text-[#edebff] text-[16px] text-nowrap whitespace-pre">Save shipping information</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#090058] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function ButtonGroup() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full" data-name="Button Group">
      <Button1 />
    </div>
  );
}

export default function FormShipping() {
  return (
    <div className="bg-white relative rounded-[8px] size-full" data-name="Form Shipping">
      <div aria-hidden="true" className="absolute border border-[#d9d9d9] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="min-w-inherit size-full">
        <div className="box-border content-stretch flex flex-col gap-[24px] items-start min-w-inherit p-[24px] relative size-full">
          <Legend />
          <InputField />
          <SelectField />
          <TextareaField />
          <CheckboxField />
          <ButtonGroup />
        </div>
      </div>
    </div>
  );
}