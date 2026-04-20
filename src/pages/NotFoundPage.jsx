import NavBar from "@/components/navbar/NavBar"
import Footer from "@/components/Footer";
import { CircleAlert } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "@/components/common/Button";

function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <NotFound />
      <Footer />
    </div>
  );
}

function NotFound() {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <CircleAlert size={70} />
        <h4 className="text-3xl font-bold pb-5">Page Not Found</h4>
        <Link to="/">
          <Button variant="primary">Go To Homepage</Button>
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;