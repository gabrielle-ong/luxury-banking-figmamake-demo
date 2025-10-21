import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Phone, Mail, MessageCircle, User } from "lucide-react";
import { Button } from "./ui/button";

interface AdvisorCardProps {
  name: string;
  title: string;
  image: string;
  isOnline: boolean;
  specialties: string[];
  yearsOfExperience: number;
  onContact?: () => void;
}

export function AdvisorCard({
  name,
  title,
  image,
  isOnline,
  specialties,
  yearsOfExperience,
  onContact
}: AdvisorCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-border">
      <div className="flex items-start gap-4 mb-4">
        <div className="relative">
          <Avatar className="w-20 h-20 bg-[#F8F5F1]">
            <AvatarFallback className="bg-[#F8F5F1]">
              <User className="w-10 h-10 text-[#C6A664]" />
            </AvatarFallback>
          </Avatar>
          {isOnline && (
            <div className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white" />
          )}
        </div>
        <div className="flex-1">
          <h3 className="text-xl text-[#1A1A1A] mb-1">{name}</h3>
          <p className="text-sm text-[#6B6B6B] mb-2">{title}</p>
          <Badge variant="secondary" className="text-xs bg-[#F8F5F1]">
            {yearsOfExperience} years experience
          </Badge>
        </div>
      </div>
      
      <div className="mb-4">
        <p className="text-xs text-[#6B6B6B] mb-2">Specialties</p>
        <div className="flex flex-wrap gap-2">
          {specialties.map((specialty, index) => (
            <Badge key={index} variant="outline" className="text-xs border-[#C6A664] text-[#C6A664]">
              {specialty}
            </Badge>
          ))}
        </div>
      </div>

      <div className="flex gap-2">
        <Button 
          size="sm" 
          className="flex-1 bg-[#1A1A1A] hover:bg-[#2A2A2A]"
          onClick={onContact}
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          Message
        </Button>
        <Button size="sm" variant="outline" className="border-[#C6A664]">
          <Phone className="w-4 h-4" />
        </Button>
        <Button size="sm" variant="outline" className="border-[#C6A664]">
          <Mail className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
