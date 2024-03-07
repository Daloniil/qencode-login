import {RouterProvider} from 'react-router-dom';
import {router} from "./utils/router.tsx";
import {Layouts} from "./layouts";

function App() {
    return (
        <>
            <Layouts>
                <RouterProvider router={router}/>
            </Layouts>
        </>
    )
}

export default App;
