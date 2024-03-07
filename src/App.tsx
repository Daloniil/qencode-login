import {RouterProvider} from 'react-router-dom';
import {router} from "./utils/router.tsx";
import {Layout} from "./layout";

function App() {
    return (
        <>
            <Layout>
                <RouterProvider router={router}/>
            </Layout>
        </>
    )
}

export default App;
