import { diet } from "src/constants/diet.constant";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { IoCheckbox } from "react-icons/io5";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BreakFastImg from "@/assets/images/food/breakfast.jpg";
import LunchImg from "@/assets/images/food/lunch.jpg";
import DinnerImg from "@/assets/images/food/dinner.jpg";
import KcalImg from "@/assets/images/icons/calories.png";
import BreakFastIcon from "@/assets/images/icons/breakfast.png";
import LunchIcon from "@/assets/images/icons/lunch.png";
import DinnerIcon from "@/assets/images/icons/dinner.png";
import CollationIcon from "@/assets/images/icons/snack.png";
import ProteinIcon from "@/assets/images/icons/protein.png";
import CarbsIcon from "@/assets/images/icons/rice.png";
import LipidesIcon from "@/assets/images/icons/lipid.png";
import MagicwandIcon from "@/assets/images/icons/magic-wand.png";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Clock2, Wand2 } from "lucide-react";
import DietCalendar from "./_components/DietCalendar";
import {
  LapTimerIcon,
  CheckboxIcon,
  MagicWandIcon,
} from "@radix-ui/react-icons";

const meals = [
  {
    type: "PETIT DÈJ",
    name: "2 œufs, 1 tranche de pain complet, 1 orange",
    icon: BreakFastIcon,
    time: "5 MINS",
    proteins: "30g",
    carbs: "60g",
    lipides: "30g",
  },
  {
    type: "COLLATION",
    name: "Yaourt, 10gr Amandes, 50gr Baies",
    icon: CollationIcon,
    time: "2 MINS",
    proteins: "10g",
    carbs: "15g",
    lipides: "17g",
  },
  {
    type: "DÉJEUNER",
    name: "Salade, 150gr Poulet, 200gr Quinoa",
    icon: LunchIcon,
    time: "7 MINS",
    proteins: "30g",
    carbs: "45g",
    lipides: "7g",
  },
  {
    type: "DÎNER",
    name: "200gr Saumon, Asperges, 150gr Patates Douces",
    icon: DinnerIcon,
    time: "5 MINS",
    proteins: "40g",
    carbs: "75g",
    lipides: "7g",
  },
];

export default function Page() {
  return (
    <div className="flex flex-1 overflow-hidden max-h-full h-full flex-row gap-8">
      <div className="w-[340px] shrink-0 h-full pb-36">
        <div className="flex flex-row items-center justify-between mb-6">
          <p className="font-semibold">Repas du jour</p>
          <DietCalendar />
        </div>{" "}
        <Tabs defaultValue="account" className="mb-6 ">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="account">Diet 1</TabsTrigger>
            <TabsTrigger value="password">Diet 2</TabsTrigger>
          </TabsList>
        </Tabs>
        <ScrollArea className="shrink-0 h-full z-30">
          <Card className="rounded-xl  mb-4 relative z-30">
            <div className="border-b p-4">
              <div className="flex flex-row items-center justify-center gap-x-3">
                <h4 className="text-center">Plan Nutritionnel</h4>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Image
                        src={MagicwandIcon}
                        alt="Breakfast icon"
                        height={25}
                        width={25}
                        className="shrink-0"
                      />
                      {/* <Wand2 className=" z-50 fill-orange-200 mx-auto " /> */}
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Générer un autre avec l&apos;IA</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="flex flex-row justify-around  w-full mt-4">
                <div>
                  <p className="text-indigo-500 font-semibold ">1,456cal</p>
                  <p className="text-gray-400 font-semibold text-xs">
                    CALORIES
                  </p>
                </div>
                <div>
                  <p className="text-green-500 font-semibold ">30g</p>
                  <p className="text-gray-400 font-semibold text-xs">
                    PROTEINS
                  </p>
                </div>
                <div>
                  <p className="text-red-500 font-semibold ">20g</p>
                  <p className="text-gray-400 font-semibold text-xs">CARBS</p>
                </div>
                <div>
                  <p className="text-orange-500 font-semibold ">5g</p>
                  <p className="text-gray-400 font-semibold text-xs">LIPIDES</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="rounded-xl mt-6">
            <div className="p-6 space-y-5">
              {meals.map((meal, index) => (
                <div className="pb-6 border-b" key={index}>
                  <div className="flex flex-row justify-between">
                    <p className="text-gray-400 font-bold text-sm">
                      {meal.type}
                    </p>
                    <div className="flex flex-row items-center gap-1">
                      <LapTimerIcon className="h-3 w-3 text-gray-400" />
                      <p className="text-gray-400 font-bold text-sm">
                        {meal.time}
                      </p>
                    </div>
                  </div>
                  {/* Header  */}
                  <div className=" my-3">
                    <h1 className="text-xl">{meal.name}</h1>
                  </div>
                  {/* footer  */}
                  <div className="flex flex-row gap-8">
                    <Image
                      src={meal.icon}
                      alt="Breakfast icon"
                      height={35}
                      width={35}
                      className="shrink-0"
                    />

                    <div className="flex flex-row justify-between w-full">
                      <div>
                        <p className="text-green-500 font-semibold ">
                          {meal.proteins}
                        </p>
                        <p className="text-gray-400 font-semibold text-xs">
                          PROTEINS
                        </p>
                      </div>
                      <div>
                        <p className="text-red-500 font-semibold ">
                          {meal.carbs}
                        </p>
                        <p className="text-gray-400 font-semibold text-xs">
                          CARBS
                        </p>
                      </div>
                      <div>
                        <p className="text-orange-500 font-semibold ">
                          {meal.lipides}
                        </p>
                        <p className="text-gray-400 font-semibold text-xs">
                          LIPIDES
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Meal 1  */}
            </div>
          </Card>
        </ScrollArea>
      </div>

      <div className="grow max-h-full space-y-6">
        <Card className="p-6 h-full">
          <div className="flex flex-row gap-5">
            <div className="w-auto">
              <Image
                src={BreakFastImg}
                alt="breakfast image"
                className="rounded-xl object-cover"
              />
            </div>
            <div className="space-y-5">
              <h4>Yaourt, 10gr Amandes, 50gr Baies</h4>
              <CardDescription className="leading-relaxed">
                his Homemade Waffle Recipe is the perfect way to enjoy a lazy
                weekend morning! Using just a handful of ingredients you likely
                have in the pantry, these waffles are sure to please.{" "}
              </CardDescription>

              <div className="flex flex-row gap-x-10 w-full">
                {/* <div className="flex flex-row gap-1">
                  <div className="">
                    <Image alt="" height={25} src={KcalImg} />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm font-bold">Kcals</p>
                    <p className=" font-bold">300</p>
                  </div>
                </div> */}
                <div className="flex flex-row gap-1">
                  <div className="">
                    <Image alt="" height={25} src={ProteinIcon} />
                  </div>
                  <div>
                    <p className="text-gray-400 font-semibold text-xs">PROT</p>
                    <p className=" font-semibold ">40</p>
                  </div>
                </div>
                <div className="flex flex-row gap-1.5">
                  <div className="">
                    <Image alt="" height={25} src={CarbsIcon} />
                  </div>
                  <div>
                    <p className="text-gray-400 font-semibold text-xs">CARBS</p>
                    <p className=" font-semibold ">60</p>
                  </div>
                </div>
                <div className="flex flex-row gap-1.5">
                  <div className="">
                    <Image alt="" height={25} src={LipidesIcon} />
                  </div>
                  <div>
                    <p className="text-gray-400 font-semibold text-xs">
                      LIPIDES
                    </p>
                    <p className=" font-semibold ">50</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h4 className="mt-7">Ingredients</h4>
          <ul className="mt-5 gap-4 flex flex-row flex-wrap">
            <li className="flex flex-row gap-1.5 items-start font-semibold text-gray-600 text-sm">
              <IoCheckbox className="text-green-500 h-5 w-5" /> 1 cup rolled
              oats
            </li>
            <li className="flex flex-row gap-1.5 items-start  font-semibold text-gray-600 text-sm">
              <IoCheckbox className="text-green-500 h-5 w-5" /> 1 cup soya
              yogurt
            </li>
            <li className="flex flex-row gap-1.5 items-start  font-semibold text-gray-600 text-sm">
              <IoCheckbox className="text-green-500 h-5 w-5" />
              10g chia seeds
            </li>
            <li className="flex flex-row gap-1.5 items-start  font-semibold text-gray-600 text-sm">
              <IoCheckbox className="text-green-500 h-5 w-5" /> 50g cocoa powder
            </li>
            <li className="flex flex-row gap-1.5 items-start  font-semibold text-gray-600 text-sm">
              <IoCheckbox className="text-green-500 h-5 w-5" /> 150ml
              unsweetened almond milk
            </li>
            <li className="flex flex-row gap-1.5 items-start  font-semibold text-gray-600 text-sm">
              <IoCheckbox className="text-green-500 h-5 w-5" /> 1 tsp ground
              cinnamon
            </li>
          </ul>
          <h4 className="mt-9">Préparation</h4>
          <div>
            <ul className="mt-5 gap-4 flex flex-col flex-wrap">
              <li className="flex flex-row gap-3 items-center font-semibold text-gray-600 text-sm ">
                <span className="w-9 h-9 rounded-xl bg-orange-100 text-orange-500 shrink-0 flex items-center justify-center">
                  1
                </span>{" "}
                Assaisonnez les filets de saumon et faites-les cuire au four.
              </li>
              <li className="flex flex-row gap-3 items-center font-semibold text-gray-600 text-sm ">
                <span className="w-9 h-9 rounded-xl bg-orange-100 text-orange-500 shrink-0 flex items-center justify-center">
                  2
                </span>{" "}
                Pelez et coupez la patate douce en cubes, enrobez-les
                d&apos;huile, de sel et de poivre, et faites-les rôtir.
              </li>
              <li className="flex flex-row gap-3 items-center font-semibold text-gray-600 text-sm ">
                <span className="w-9 h-9 rounded-xl bg-orange-100 text-orange-500 shrink-0 flex items-center justify-center">
                  3
                </span>{" "}
                Faites sauter les asperges dans une poêle avec de l&apos;ail et
                de l&apos;huile d&apos;olive.
              </li>
              <li className="flex flex-row gap-3 items-center font-semibold text-gray-600 text-sm ">
                <span className="w-9 h-9 rounded-xl bg-orange-100 text-orange-500 shrink-0 flex items-center justify-center">
                  4
                </span>{" "}
                Servez le saumon, la patate douce rôtie et les asperges sautées
                ensemble.
              </li>
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
}
