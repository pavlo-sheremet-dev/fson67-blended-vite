import { Section } from "../components/Section";
import { Loader } from "../components/Loader";
import { GoBackBtn } from "../components/GoBackBtn";
import { CocktailInfo } from "../components/CocktailInfo";
import { useLocation, useParams } from "react-router-dom";
import { routes } from "../routes";
import { useEffect, useState } from "react";
import { getCocktailDetail } from "../api/cocktail-service";

export const CocktailDetail = () => {
  const [cocktailData, setCocktailData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { cocktailId } = useParams();
  const location = useLocation();

  useEffect(() => {
    if (!cocktailId) return;

    const asyncWrap = async () => {
      setIsLoading(true);
      try {
        const response = await getCocktailDetail(cocktailId);
        setCocktailData(response);
      } catch (err) {
        console.log(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    asyncWrap();
  }, [cocktailId]);

  return (
    <Section>
      <GoBackBtn path={location.state?.from ?? { pathname: "/" }} />
      {cocktailData && <CocktailInfo {...cocktailData} />}
      {isLoading && <Loader />}
    </Section>
  );
};
