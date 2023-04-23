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

  useEffect(() => {
    const query = searchParams.get("query");
    if (!query) return;
    const asyncWrap = async () => {
      setIsLoading(true);
      try {
        const response = await searchByName(query);
        setCocktails(response);
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
        {!cocktails.length && <p>По данному запиту немає коктелів</p>}
      </Section>
      {isLoading && <Loader />}
    </>
  );
};
