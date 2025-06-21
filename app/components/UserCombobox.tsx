import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button"; // Assuming you have a Button component
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "~/components/ui/command"; // Assuming you have Command components
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover"; // Assuming you have Popover components
import type { User } from "~/types/admin"; // Assuming your User type is here

interface UserComboboxProps {
  users: User[];
  selectedUserId: string;
  onSelectUser: (userId: string) => void;
  disabled?: boolean;
}

export function UserCombobox({
  users,
  selectedUserId,
  onSelectUser,
  disabled,
}: UserComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(selectedUserId);
  const [searchTerm, setSearchTerm] = React.useState("");

  // Find the selected user object based on selectedUserId prop
  const selectedUser = React.useMemo(() => {
    return users.find((user) => user.id === selectedUserId);
  }, [users, selectedUserId]);

  // Update internal value when selectedUserId prop changes
  React.useEffect(() => {
    setValue(selectedUserId);
  }, [selectedUserId]);

  // Filter users based on search term
  const filteredUsers = React.useMemo(() => {
    if (!searchTerm) {
      return users;
    }
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return users.filter(user =>
      user.fullName.toLowerCase().includes(lowerCaseSearchTerm) ||
      user.id.toLowerCase().includes(lowerCaseSearchTerm)
    );
  }, [users, searchTerm]);


  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between",
            !value && "text-muted-foreground"
          )}
          disabled={disabled}
        >
          {selectedUser
            ? selectedUser.fullName
            : "Select recipient..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popper-anchor-width] p-0">
        <Command>
          <CommandInput
            placeholder="Search user..."
            value={searchTerm}
            onValueChange={setSearchTerm} // Use onValueChange to update searchTerm
          />
          {/* Use filteredUsers for the list */}
          <CommandEmpty>{searchTerm ? "No user found." : "No users available."}</CommandEmpty>
          <CommandGroup>
            {filteredUsers.map((user) => (
              <CommandItem
                key={user.id}
                value={user.fullName} // Use full name for command search matching
                onSelect={() => {
                  onSelectUser(user.id); // Call the prop function with the user ID
                  setValue(user.id); // Update internal value
                  setOpen(false); // Close the popover
                  setSearchTerm(""); // Clear search term on select
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === user.id ? "opacity-100" : "opacity-0"
                  )}
                />
                {user.fullName} ({user.id})
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
