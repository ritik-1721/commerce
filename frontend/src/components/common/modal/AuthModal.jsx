import { useDispatch, useSelector } from "react-redux";
import { authModalActions } from "@/store/slice/authModalSlice";
import { Fragment, useRef, useCallback } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  LoginView,
  ForgotPassword,
  SignUpView,
} from "@/components/common/auth";
import { CrossIcon } from "@/components/icons";

export default function AuthModal() {
  const dispatch = useDispatch();

  const activeView = useSelector((state) => state.authModal.activeView);
  const open = useSelector((state) => state.authModal.open);

  const setActiveViewAction = useCallback(
    (type) => {
      dispatch(authModalActions.setActiveView(type));
    },
    [dispatch]
  );

  const closeModalHandler = useCallback(() => {
    dispatch(authModalActions.closeModal());
  }, [dispatch]);

  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={() => {}}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm backdrop-brightness-150 transition-opacity opacity-80 overflow-hidden top-0 left-0 right-0 bottom-0" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-none bg-white text-left shadow-xl transition-all my-8 p-1 w-auto">
                <div className="bg-primary p-1 xs:p-2 sm:p-12 relative">
                  <button
                    onClick={closeModalHandler}
                    ref={cancelButtonRef}
                    className="hover:text-accent-5 transition ease-in-out duration-150 focus:outline-none absolute right-0 top-0 m-6"
                  >
                    <CrossIcon className="h-6 w-6" />
                  </button>

                  {activeView === "SIGNUP_VIEW" ? (
                    <SignUpView
                      onClose={closeModalHandler}
                      onAuthViewChange={setActiveViewAction}
                    />
                  ) : activeView === "FORGOT_VIEW" ? (
                    <ForgotPassword
                      onClose={closeModalHandler}
                      onAuthViewChange={setActiveViewAction}
                    />
                  ) : activeView === "LOGIN_VIEW" ? (
                    <LoginView
                      onClose={closeModalHandler}
                      onAuthViewChange={setActiveViewAction}
                    />
                  ) : null}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
