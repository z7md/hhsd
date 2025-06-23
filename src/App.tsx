import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from "./pages/Home";
import Item1 from "./pages/Item1";
import Item2 from "./pages/Item2";
import About from "./pages/About";
import Book from "./pages/Book";
import Test from "./pages/Test";

const App = () => {

	return (
		<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/item1" element={<Item1 />} />
					<Route path="/item2" element={<Item2 />} />
					<Route path="/about" element={<About />} />
					<Route path="/booking" element={<Book />} />
					<Route path="/testimonials" element={<Test />} />
				</Routes>
				</BrowserRouter>
	);
};

export default App;
