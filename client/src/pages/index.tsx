import React from "react";

//components
import Header from "@/components/headerComponent/header";
import Form from "@/components/formComponent/form";
import Footer from "@/components/footerComponent/footer";

export default function Home() {
  return (
    <>
    <Header />
    <main className="bg-neutral-200 min-h-screen">
      <div className="max-w-5xl min-h-screen mx-auto">
        <Form />
      </div>
    </main>
    <Footer />
    </>
  );
};
