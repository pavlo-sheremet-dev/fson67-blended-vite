import { SearchForm } from "../components/SearchForm";
import { Section } from "../components/Section";
import { CocktailsList } from "../components/CocktailsList";
import { Loader } from "../components/Loader";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { searchByName } from "../api/cocktail-service";

export const Cocktails = () => {
  const [searchParams] = useSearchParams();
  const [cocktails, setCocktails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    const query = searchParams.get("query");
    if (!query) return;
    const asyncWrap = async () => {
      setIsLoading(true);
      try {
        const response = await searchByName(query);
        setCocktails(response);
        setIsFirstRender(false);
      } catch (err) {
        console.log(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    asyncWrap();
  }, [searchParams]);

  return (
    <>
      <Section>
        <h1 className="uppercase text-4xl text-gray-600 text-center">
          Search Cocktails
        </h1>
        <SearchForm />
        {!!cocktails.length && <CocktailsList cocktails={cocktails} />}
        {isFirstRender && <p>Введіть пошуковий запит</p>}
        {!isFirstRender && !cocktails.length && (
          <p>По данному запиту немає коктелів</p>
        )}
      </Section>
      {isLoading && <Loader />}
    </>
  );
};
