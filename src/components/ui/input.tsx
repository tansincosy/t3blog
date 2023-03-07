import React, { useEffect, useState } from "react";
import { Button } from "./button";
import tw, { css, styled } from "twin.macro";
import { Icon } from "./icon";
const InputLabel = styled.label<{ isFocus: boolean }>(({ isFocus }) => [
  tw`body-large whitespace-nowrap overflow-hidden text-ellipsis absolute top-4 left-12 text-on-surface-variant transition-all`,
  isFocus && tw`body-small top-2`,
]);

const InputMain = tw.input`w-full pl-0 pr-2 h-6 bg-transparent relative inline-flex outline-none top-2`;
const InputContainer = styled.div<{ isFocus: boolean }>(({ isFocus }) => [
  tw`w-full flex
  before:(border-b border-on-surface-variant left-0 bottom-0 absolute right-0 pointer-events-none)
  after:(border-b-2 border-primary absolute right-0 left-0 pointer-events-none transform-gpu scale-x-0 bottom-0)`,
  css`
    transition: transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
  `,
  isFocus &&
    css`
      &::after {
        transform: scaleX(1) translateX(0);
      }
    `,
]);

export type SearchBoxProps = Omit<
  React.ComponentProps<"div">,
  "onSubmit" | "onReset" | "onChange"
> &
  Pick<
    React.ComponentProps<"input">,
    "placeholder" | "onChange" | "type" | "name" | "autoComplete" | "autoFocus"
  > & {
    value?: string;
    classNames?: any;
    trailingIcon?: React.ReactNode;
  };

export const Input = ({
  placeholder,
  trailingIcon,
  autoComplete,
  name,
  onChange,
  autoFocus = false,
  type = "text",
}: SearchBoxProps) => {
  const [isFocus, setFocus] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    setFocus(autoFocus);
  }, [autoFocus]);
  const onChangeHandle: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setValue(event.target.value);
    onChange && onChange(event);
  };

  const onClearHandle = () => {
    setValue("");
  };

  return (
    <div tw="relative cursor-text inline-flex h-14 rounded-t-md bg-surface-variant items-center text-on-surface w-full">
      {trailingIcon && (
        <Button
          type="tonal"
          icon={trailingIcon}
          tw="mr-2 text-on-surface-variant"
        ></Button>
      )}
      <InputLabel isFocus={isFocus || value?.length !== 0}>
        {placeholder}
      </InputLabel>
      <InputContainer isFocus={isFocus}>
        <InputMain
          autoComplete={autoComplete}
          name={name}
          value={value}
          onChange={onChangeHandle}
          maxLength={512}
          type={type}
          onClick={() => {
            setFocus(true);
          }}
          onFocus={() => {
            setFocus(true);
          }}
          onBlur={() => {
            if (value.length === 0) {
              setFocus(false);
            }
          }}
        />
      </InputContainer>
      {value?.length !== 0 && (
        <Button
          onClick={onClearHandle}
          type="text"
          icon={<Icon name="close-circle" tw="text-on-surface-variant"></Icon>}
        ></Button>
      )}
    </div>
  );
};

Input.displayName = "Input";
