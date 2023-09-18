import ProfileSidebarMenu from "@/components/common/ProfileSidebarMenu";
import ProtectedRoute from "@/middleware/ProtectedRoute";

export default function AddressPage() {
  return (
    <ProtectedRoute>
      <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
        <div className="hidden lg:block">
          <ProfileSidebarMenu activeLink={"/address"} />
        </div>
        <div className="lg:col-span-3 px-3  md:px-28">
          <div className="flex-[3] ">
            <div className="bg-white">
              <div className="text-xl-semi  flex items-center gap-x-4 px-8 pb-6 pt-8  text-[28px] font-semibold ">
                <h2>Address</h2>
              </div>
              <div className="px-8 pb-8"></div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
