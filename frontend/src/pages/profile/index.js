import ProtectedRoute from "@/middleware/ProtectedRoute";
import Button from "@/components/ui/Button";
import { useSelector } from "react-redux";
import Link from "next/link";
import ProfileSidebarMenu from "@/components/common/ProfileSidebarMenu";

export default function ProfilePage() {
  const userDetails = useSelector((state) => state.auth.userDetails);

  return (
    <ProtectedRoute>
      {/* <!-- component --> */}
      <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
        <div className="hidden lg:block">
          <ProfileSidebarMenu activeLink={"/profile"} />
        </div>
        <div className="lg:col-span-3 px-3  md:px-28">
          <div className="flex-[3] ">
            <div className="bg-white">
              <div className="text-xl-semi  flex items-center gap-x-4 px-8 pb-6 pt-8  text-[28px] font-semibold ">
                <h2>Profile Details</h2>
              </div>
              <div className="px-8 pb-8">
                <div className="grid grid-cols-1 gap-y-2">
                  {/*  */}
                  <table class="table-auto">
                    <tbody>
                      <tr>
                        <td>First Name</td>
                        <td>{userDetails?.fname}</td>
                      </tr>
                      <tr>
                        <td>Last Name</td>
                        <td>{userDetails?.lname}</td>
                      </tr>
                      <tr>
                        <td>Email</td>
                        <td>{userDetails?.email}</td>
                      </tr>
                    </tbody>
                  </table>
                  {/*  */}
                  <br />
                  <Link href="/edit">
                    <Button className="h-[54px]">EDIT</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
