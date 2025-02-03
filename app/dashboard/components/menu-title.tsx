import { PersonStandingIcon } from "lucide-react";

export default function MenuTitle() {
  return (
    <h4 className="flex items-center cursor-pointer">
      <PersonStandingIcon size={35} className="text-pink-600" /> SupportMe
    </h4>
  );
}
