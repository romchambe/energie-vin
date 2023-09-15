import {
  Button,
  Card,
  Flex,
  Heading,
  Image,
  Input,
  Text,
} from "@chakra-ui/react";
import { useApi } from "./api/api.hook";
import { HttpVerb } from "./api/api";
import { ChangeEventHandler, useCallback, useEffect, useState } from "react";
import { AxiosRequestConfig } from "axios";

interface Wine {
  id: number;
  picture: string;
  name: string;
  year: number;
  currentPrice: { amount: number };
  average: number;
}

const endpoint = () => ({
  url: "/wines/list",
  method: HttpVerb.GET,
});

export function App() {
  const { fetchApi, data, loading } = useApi<Wine[]>(endpoint);

  const [min, setMin] = useState<null | number>(null);
  const [max, setMax] = useState<null | number>(null);

  const handleMinChange: ChangeEventHandler<HTMLInputElement> = (event) =>
    setMin(Number.parseFloat(event.target.value) || null);
  const handleMaxChange: ChangeEventHandler<HTMLInputElement> = (event) =>
    setMax(Number.parseFloat(event.target.value) || null);

  const handleFiltering = useCallback(() => {
    const config: AxiosRequestConfig = { params: {} };

    if (!!min && Number.isFinite(min)) {
      config.params.minPrice = min * 100;
    }

    if (!!max && Number.isFinite(max)) {
      config.params.maxPrice = max * 100;
    }

    fetchApi({
      config,
    });
  }, [fetchApi, max, min]);

  useEffect(() => {
    fetchApi({});
  }, [fetchApi]);

  return (
    <Flex h="100vh" w="100%" py={20} px={10} direction={"column"}>
      <Flex direction="column" align="center" mb={10}>
        <Heading size="2xl">Energie Vin</Heading>
        <Heading size="md" mt={5}>
          Les meilleurs experts, à VOTRE service
        </Heading>
        <Flex mt={8}>
          <Input
            placeholder="Prix minimum"
            mr={4}
            value={min || ""}
            type="number"
            onChange={handleMinChange}
          />
          <Input
            placeholder="Prix maximum"
            mr={4}
            value={max || ""}
            type="number"
            onChange={handleMaxChange}
          />
          <Button
            colorScheme="pink"
            w={80}
            onClick={handleFiltering}
            isLoading={loading}
          >
            Filtrer par prix
          </Button>
        </Flex>
      </Flex>
      <Flex wrap="wrap">
        {(data || []).map((wine) => (
          <Card maxH={360} w={300} mr={10} mb={10} p={8} key={wine.id}>
            <Flex direction="column" align={"center"}>
              <Image src={wine.picture} boxSize={160} objectFit="contain" />
              <Text mt={4} fontWeight={700}>
                {wine.name}
              </Text>
              <Text mt={1}>
                {wine.year} - {wine.currentPrice.amount / 100} €
              </Text>

              <Text mt={4} textAlign={"center"}>
                Note moyenne de nos experts : {Math.round(wine.average)} / 100
              </Text>
            </Flex>
          </Card>
        ))}
      </Flex>
    </Flex>
  );
}
