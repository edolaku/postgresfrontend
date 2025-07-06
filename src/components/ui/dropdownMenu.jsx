import { MoreHorizontal } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"



export function ComboboxDropdownMenu({ children }) {
    const [open, setOpen] = useState(false)

    return (
        <div className="flex w-full flex-col items-start justify-between rounded-md border sm:flex-row sm:items-center">
            <DropdownMenu open={open} onOpenChange={setOpen}>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                        <MoreHorizontal />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                    <DropdownMenuLabel>Opsi</DropdownMenuLabel>
                    {/* <DropdownMenuGroup>
                        <DropdownMenuItem>Assign to...</DropdownMenuItem>
                        <DropdownMenuItem>Set due date...</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                            Delete
                            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </DropdownMenuGroup> */}
                    {children}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
