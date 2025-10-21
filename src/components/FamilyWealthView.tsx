import { motion } from "motion/react";
import { ArrowLeft, Users, Shield, FileText, Eye, Edit3, Lock } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { AvatarLargeSquare } from "../imports/AvatarComponents";

interface FamilyWealthViewProps {
  onBack: () => void;
}

export function FamilyWealthView({ onBack }: FamilyWealthViewProps) {
  const familyMembers = [
    {
      name: "Somchai Pattana",
      relation: "Primary Account Holder",
      access: "Full Access"
    },
    {
      name: "Anchana Pattana",
      relation: "Spouse",
      access: "Full Access"
    },
    {
      name: "Natthida Pattana",
      relation: "Daughter",
      access: "View Only"
    },
    {
      name: "Pongsakorn Pattana",
      relation: "Son",
      access: "View Only"
    }
  ];

  const trusts = [
    {
      name: "Pattana Family Trust",
      type: "Revocable Living Trust",
      established: "2020",
      value: 45000000,
      beneficiaries: 3
    },
    {
      name: "Education Trust Fund",
      type: "Irrevocable Trust",
      established: "2018",
      value: 12000000,
      beneficiaries: 2
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8F5F1] pb-20">
      <div className="bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] text-white p-6 pb-12">
        <Button 
          variant="ghost" 
          className="text-white hover:bg-white/10 mb-4 -ml-2"
          onClick={onBack}
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </Button>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h1 className="text-3xl mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
            Family Wealth Center
          </h1>
          <p className="text-gray-300">Manage trusts, inheritance & family access</p>
        </motion.div>
      </div>

      <div className="px-6 -mt-6 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl text-[#1A1A1A]">Family Members</h3>
            <Button size="sm" variant="outline" className="border-[#C6A664]">
              <Users className="w-4 h-4 mr-2" />
              Add Member
            </Button>
          </div>

          <div className="space-y-3">
            {familyMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-4 shadow-sm border border-border"
              >
                <div className="flex items-center gap-4">
                  <AvatarLargeSquare 
                    alt={member.name}
                  />
                  <div className="flex-1">
                    <h4 className="text-[#1A1A1A] mb-1">{member.name}</h4>
                    <p className="text-sm text-[#6B6B6B]">{member.relation}</p>
                  </div>
                  <div className="text-right">
                    <Badge 
                      variant={member.access === "Full Access" ? "default" : "secondary"}
                      className={member.access === "Full Access" ? "bg-[#1F6652]" : ""}
                    >
                      {member.access === "Full Access" ? <Edit3 className="w-3 h-3 mr-1" /> : <Eye className="w-3 h-3 mr-1" />}
                      {member.access}
                    </Badge>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl text-[#1A1A1A]">Trust Management</h3>
            <Button size="sm" variant="outline" className="border-[#C6A664]">
              <Shield className="w-4 h-4 mr-2" />
              Create Trust
            </Button>
          </div>

          <div className="space-y-4">
            {trusts.map((trust, index) => (
              <Card key={index} className="p-5 border-[#C6A664]">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#F8F5F1] flex items-center justify-center">
                      <Shield className="w-5 h-5 text-[#C6A664]" />
                    </div>
                    <div>
                      <h4 className="text-[#1A1A1A] mb-1">{trust.name}</h4>
                      <p className="text-sm text-[#6B6B6B]">{trust.type}</p>
                    </div>
                  </div>
                  <Badge variant="outline">{trust.established}</Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-border">
                  <div>
                    <p className="text-xs text-[#6B6B6B] mb-1">Trust Value</p>
                    <p className="text-lg text-[#1A1A1A]">
                      {(trust.value / 1000000).toFixed(1)}M THB
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[#6B6B6B] mb-1">Beneficiaries</p>
                    <p className="text-lg text-[#1A1A1A]">{trust.beneficiaries} members</p>
                  </div>
                </div>

                <Button variant="outline" className="w-full mt-4 border-[#C6A664]">
                  <FileText className="w-4 h-4 mr-2" />
                  View Trust Documents
                </Button>
              </Card>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-[#1F6652] to-[#155243] rounded-2xl p-6 text-white"
        >
          <Lock className="w-8 h-8 mb-3" />
          <h3 className="text-xl mb-2">Inheritance Planning</h3>
          <p className="text-white/90 mb-4">
            Secure your family's future with comprehensive estate planning and wealth transfer strategies.
          </p>
          <Button className="bg-white text-[#1F6652] hover:bg-gray-100">
            Schedule Consultation
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
