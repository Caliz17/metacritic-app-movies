import { useState, useEffect } from "react";
import { View, FlatList } from "react-native";
import { getLatestGames } from "../lib/metacritic";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AnimatedGameCard } from "./GameCard";
import { ActivityIndicator } from "react-native";
import { Logo } from "./Logo";

export function Main() {
  // estado inicial, es como una variable que cada que cambia de valor se renderiza el componente y reflejar el cambio
  const [games, setGames] = useState([]);
  const insets = useSafeAreaInsets();

  // un efecto es algo que cada vez que cambia las dependencias que aparecen or enderizan ejectua la funcion
  useEffect(() => {
    // se recupera los juegos
    getLatestGames().then((games) => {
      // se actualiza el estado
      setGames(games);
    });
  }, []);

  return (
    <View style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
      <View style={{ marginBottom: 10 }}>
        <Logo />
      </View>
      {games.length === 0 ? (
        <ActivityIndicator color={"#fff"} size={"large"} />
      ) : (
        <FlatList
          data={games}
          keyExtractor={(game) => game.slug}
          renderItem={({ item, index }) => (
            <AnimatedGameCard game={item} index={index} />
          )}
        />
      )}
    </View>
  );
}
