import { CocktailsList } from "../components/CocktailsList";
import { Section } from "../components/Section";
import { Loader } from "../components/Loader";
import { useEffect, useState } from "react";
import { getTrendingCocktails } from "../api/cocktail-service";

export const Home = () => {
	const [cocktails, setCocktails] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const asincWrapper = async () => {
			setIsLoading(true);
			try {
				const responce = await getTrendingCocktails();
				setCocktails(responce);
			} catch (error) {
				console.log(error.message);
			} finally {
				setIsLoading(false);
			}
		};
		asincWrapper();
	}, []);

	return (
		<>
			<Section>
				<h1 className="text-center font-black text-gray-700 text-4xl mb-10">
					Trending cocktails
				</h1>

				<CocktailsList cocktails={cocktails} />
			</Section>
			{isLoading && <Loader />}
		</>
	);
};
