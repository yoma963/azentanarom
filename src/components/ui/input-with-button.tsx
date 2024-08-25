import React from "react";
import { Input, Button } from "@material-tailwind/react";

const InputWithButton = () => {
  // const [email, setEmail] = React.useState<string>("");
  // const onChange = (e: React.FormEvent<HTMLInputElement>) => {
  //   setEmail(e.currentTarget.value);
  // };
  return (
    <div className="relative flex w-full max-w-[24rem]">
      <Input
        type="email"
        label="Email Address"
        // value={email}
        // onChange={onChange}
        className="pr-20"
        containerProps={{
          className: "min-w-0",
        }}
        crossOrigin={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}      />
      <Button
        size="sm"
        // color={email ? "gray" : "blue-gray"}
        // disabled={!email}
        className="!absolute right-1 top-1 rounded" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}      >
        Invite
      </Button>
    </div>
  )
}

export default InputWithButton;