import React, { useMemo } from "react";
import {
  Page,
  Text,
  View,
  Document,
  Image,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { useCalculationStore } from "@/store/calculation";

Font.register({
  family: "Roboto",
  src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf",
});

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  logo: {
    width: 70,
    height: 70,
    marginRight: 10,
  },
  kat: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4174B9",
    fontFamily: "Roboto",
  },
  rin: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#D95563",
    fontFamily: "Roboto",
    marginLeft: 5,
  },
  section: {
    marginBottom: 10,
    padding: 10,
    border: "1px solid #ccc",
    borderRadius: 4,
  },
  title: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "bold",
    fontFamily: "Roboto",
  },
  info: {
    fontSize: 20,
    paddingBottom: 10,
    fontWeight: "bold",
    fontFamily: "Roboto",
    textAlign: "center",
  },
  item: {
    fontSize: 12,
    marginBottom: 2,
    fontFamily: "Roboto",
  },
});

export default function MyPdfDocument() {
  const {
    region,
    floors,
    length,
    width,
    squareLand,
    selectedServices,
    selectedEngineeringServices,
    foundationType,
    foundationPrice,
    wallType,
    wallPrice,
    doorType,
    doorPrice,
    windowType,
    windowPrice,
    facadeType,
    facadePrice,
    draftType,
    draftPrice,
    roofType,
    roofPrice,
    wallDecorationType,
    wallDecorationPrice,
    floorCoveringType,
    floorCoveringPrice,
    ceilingCoveringType,
    ceilingCoveringPrice,
  } = useCalculationStore();

  const totalPrice = useMemo(() => {
    const serviceTotal = selectedServices.reduce(
      (acc, service) => acc + service.price,
      0,
    );

    const engineersTotal = selectedEngineeringServices.reduce(
      (acc, service) => acc + service.price,
      0,
    );

    return (
      serviceTotal +
      engineersTotal +
      (foundationPrice || 0) +
      (wallPrice || 0) +
      (roofPrice || 0) +
      (facadePrice || 0) +
      (windowPrice || 0) +
      (ceilingCoveringPrice || 0) +
      (wallDecorationPrice || 0) +
      (floorCoveringPrice || 0) +
      (draftPrice || 0) +
      (doorPrice || 0)
    );
  }, [
    selectedServices,
    selectedEngineeringServices,
    foundationPrice,
    wallPrice,
    roofPrice,
    draftPrice,
    facadePrice,
    windowPrice,
    doorPrice,
    floorCoveringPrice,
    wallDecorationPrice,
    ceilingCoveringPrice,
  ]);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Image style={styles.logo} src="/logo.jpg" />
          <Text style={styles.kat}>
            КАТ<Text style={styles.rin}>РИН</Text>
          </Text>
        </View>
        <Text style={styles.info}>Информация о доме</Text>
        <View style={styles.section}>
          <Text style={styles.title}>Основная информация</Text>
          <Text style={styles.item}>Регион: {region?.label}</Text>
          <Text style={styles.item}>Этажность: {floors}</Text>
          <Text style={styles.item}>Длина: {length} м</Text>
          <Text style={styles.item}>Ширина: {width} м</Text>
          <Text style={styles.item}>Площадь участка: {squareLand} сот.</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>Услуги</Text>
          {selectedServices.length > 0 ? (
            selectedServices.map((service) => (
              <Text key={service.id} style={styles.item}>
                {service.label} — {service.price}
              </Text>
            ))
          ) : (
            <Text style={styles.item}>Не выбраны</Text>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>Инженерные услуги</Text>
          {selectedEngineeringServices.length > 0 ? (
            selectedEngineeringServices.map((service) => (
              <Text key={service.id} style={styles.item}>
                {service.label} — {service.price}
              </Text>
            ))
          ) : (
            <Text style={styles.item}>Не выбраны</Text>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>Строительные элементы</Text>
          <Text style={styles.item}>
            Фундамент: {foundationType} — {foundationPrice}
          </Text>
          <Text style={styles.item}>
            Стены: {wallType} — {wallPrice}
          </Text>
          <Text style={styles.item}>
            Крыша: {roofType} — {roofPrice}
          </Text>
          <Text style={styles.item}>
            Фасад: {facadeType} — {facadePrice}
          </Text>
          <Text style={styles.item}>
            Черновые работы: {draftType} — {draftPrice}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>Окна и двери</Text>
          <Text style={styles.item}>
            Двери: {doorType} — {doorPrice}
          </Text>
          <Text style={styles.item}>
            Окна: {windowType} — {windowPrice}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>Отделка</Text>
          <Text style={styles.item}>
            Отделка стен: {wallDecorationType} — {wallDecorationPrice}
          </Text>
          <Text style={styles.item}>
            Покрытие пола: {floorCoveringType} — {floorCoveringPrice}
          </Text>
          <Text style={styles.item}>
            Потолок: {ceilingCoveringType} — {ceilingCoveringPrice}
          </Text>
        </View>

        <Text style={styles.title}>Итого: {totalPrice.toLocaleString()}</Text>
      </Page>
    </Document>
  );
}
