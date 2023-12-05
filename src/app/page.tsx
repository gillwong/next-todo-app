import { permanentRedirect } from "next/navigation";

export default function RedirectToHome() {
  permanentRedirect("/home");
}
