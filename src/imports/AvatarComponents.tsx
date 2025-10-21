import { User } from "lucide-react";

// Avatar - Large, Square component from Gab - Simple Design Library
export function AvatarLargeSquare({ 
  src, 
  alt = "User avatar",
  fallback 
}: { 
  src?: string; 
  alt?: string;
  fallback?: string;
}) {
  return (
    <div 
      className="relative shrink-0 size-[56px] overflow-hidden rounded-[var(--radius)]" 
      data-name="Avatar Large Square"
    >
      {src ? (
        <img 
          src={src} 
          alt={alt}
          className="size-full object-cover"
        />
      ) : (
        <div className="size-full bg-muted flex items-center justify-center">
          {fallback ? (
            <p className="text-muted-foreground">{fallback}</p>
          ) : (
            <User className="size-6 text-muted-foreground" />
          )}
        </div>
      )}
    </div>
  );
}
