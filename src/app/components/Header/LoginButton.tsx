import dynamic from "next/dynamic";
import Image from "next/image";

const LoginModal = dynamic(
  () =>
    import("src/app/features/authentication/components/Login/LoginModal").then(
      (module) => ({
        default: module.LoginModal,
      })
    ),
  { loading: () => <h1 style={{ fontSize: "72px" }}>Loading</h1> }
);

type LogginButtonProps = {
  showLoginModal: boolean;
  closeLoginModal: Function;
  setShowLoginModal: Function;
};

export default function LoginButton(props: LogginButtonProps) {
  return (
    <div data-flex onClick={() => props.setShowLoginModal(true)}>
      <div data-flex className="login-content">
        Log In
        <span data-flex id="login-logo">
          <Image
            src="/header/logo_avatar.png"
            alt="user avatar icon"
            width={47}
            height={47}
            className="h-full w-auto logo-avatar"
          />
        </span>
      </div>
      {props.showLoginModal && (
        <LoginModal
          showModal={props.showLoginModal}
          closeModal={props.closeLoginModal}
        />
      )}
    </div>
  );
}
