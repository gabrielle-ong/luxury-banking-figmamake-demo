import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Star } from "lucide-react";

interface LifestyleCardProps {
  title: string;
  description: string;
  category: string;
  image: string;
  exclusiveOffer?: string;
  onBook?: () => void;
}

export function LifestyleCard({
  title,
  description,
  category,
  image,
  exclusiveOffer,
  onBook
}: LifestyleCardProps) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-border hover:shadow-lg transition-all duration-300 flex-shrink-0 w-80">
      <div className="relative h-48 overflow-hidden">
        <ImageWithFallback 
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        {exclusiveOffer && (
          <Badge className="absolute top-3 right-3 bg-[#C6A664] text-white border-0">
            <Star className="w-3 h-3 mr-1" />
            {exclusiveOffer}
          </Badge>
        )}
      </div>
      
      <div className="p-5">
        <div className="mb-3">
          <p className="text-xs text-[#C6A664] mb-1">{category}</p>
          <h4 className="text-lg text-[#1A1A1A] mb-2">{title}</h4>
          <p className="text-sm text-[#6B6B6B] line-clamp-2">{description}</p>
        </div>
        
        <Button 
          className="w-full bg-[#1A1A1A] hover:bg-[#2A2A2A]"
          onClick={onBook}
        >
          Book Now
        </Button>
      </div>
    </div>
  );
}
