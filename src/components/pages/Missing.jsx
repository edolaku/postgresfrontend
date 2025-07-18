import { Link } from "react-router-dom"
import { Button } from "../ui/button"

const Missing = () => {
    return (
        <div className='h-svh jus'>
            <div className='m-auto flex  w-full flex-col items-center justify-center gap-2'>
                <h1 className='text-[7rem] font-bold leading-tight'>404</h1>
                <span className='font-medium'>Oops! Page Not Found!</span>
                <p className='text-center text-muted-foreground'>
                    It seems like the page you are looking for does not exist or might have been removed.
                </p>
                <div className='mt-6 flex gap-4'>

                    <Link to="/welcome">
                        <Button>
                            Go Home
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Missing



// const Missing = () => {
//     return (
//         <article style={{ padding: "100px" }}>
//             <h1>Oops!</h1>
//             <p>Page Not Found</p>
//             <div className="flexGrow">
//                 <Link to="/">Visit Our Homepage</Link>
//             </div>
//         </article>
//     )
// }

// export default Missing