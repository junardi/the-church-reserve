import Header from "../header/header.component";
import Footer from "../footer/footer.component";
export default function MainLayout({children}) { 
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    )
}