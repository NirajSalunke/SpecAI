
import { Suspense } from "react";
import {
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

import { Button } from "@workspace/ui/components/button";

export default function Page() {
  return (
    <div className="flex min-h-svh p-6">
      <div className="flex max-w-md min-w-0 flex-col gap-4 text-sm leading-loose">
        <div>
          <h1 className="font-medium">Project ready!</h1>
          <p>You may now add components and start building.</p>
          <p>We've already added the button component for you.</p>

          <Button className="mt-2">Button</Button>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Suspense fallback={<div className="h-9" />}>
            <Show when="signed-out">
              <SignInButton mode="modal">
                <Button variant="outline">Sign in</Button>
              </SignInButton>

              <SignUpButton mode="modal">
                <Button>Sign up</Button>
              </SignUpButton>
            </Show>

            <Show when="signed-in">
              <UserButton />
            </Show>
          </Suspense>
        </div>

        <div className="text-muted-foreground font-mono text-xs">
          (Press <kbd>d</kbd> to toggle dark mode)
        </div>
      </div>
    </div>
  );
}
