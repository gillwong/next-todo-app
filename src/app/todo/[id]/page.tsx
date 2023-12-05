import { permanentRedirect } from "next/navigation";

export default function RedirectToView({ params }: { params: { id: string } }) {
  permanentRedirect(`/todo/${params.id}/view`);
}
