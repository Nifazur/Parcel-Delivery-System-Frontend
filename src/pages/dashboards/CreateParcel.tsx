import CreateParcelForm from "@/components/parcel/CreateParcelForm";
import SectionHeader from "@/components/SectionHeader";
import { Package } from "lucide-react";


const CreateParcel = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4">
            <SectionHeader icon={Package} title="Create New Parcel" description="Fill in the details to create a new parcel delivery request" containerClassName="flex justify-center"></SectionHeader>
            <CreateParcelForm></CreateParcelForm>
        </div>
    );
};

export default CreateParcel;