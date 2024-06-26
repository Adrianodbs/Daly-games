import Container from "@/components/container"
import { GameProps } from "@/utils/types/game"
import Image from "next/image"
import { redirect } from "next/navigation"
import Label from "./components/label"
import GameCard from "@/components/gameCard"

async function getData (id:string){
  try {
    const res = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game&id=${id}`, {cache: "no-store"})
    return res.json()
  } catch (error) {
    throw new Error ("error")
  }
}

async function getGameSorted(){
  try {
    const res = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game_day`, {cache: "no-store"})
    return res.json()
  } catch (error) {
    throw new Error ("error")
  }
}

export default async function Game({
  params:{id}
}: {params: {id: string}}) {

  const data: GameProps = await getData(id)
  const sortedGame: GameProps = await getGameSorted()

  if (!data){
    redirect("/")
  }
  return (
    <main className="w-full text-black">
      <div className="bg-black w-full relative h-80 sm:h-96">
        <Image 
        src={data.image_url} 
        alt={data.title} 
        priority
        className="object-cover w-full h-80 sm:h-96 opacity-80" 
        quality={100} 
        fill={true} 
        sizes="(max-width:768px) 100vw, (max-width:1200px) 44vw" />
      </div>

      <Container>
        <h1 className="font-bold text-xl my-4">{data.title}</h1>
        <p>{data.description}</p>

        <h2 className="font-bold text-lg mt-7 mb-2">Plataformas</h2>
        <div className="flex gap-2 flex-wrap">
          {data.platforms.map((item)=>(
            <Label name={item} key={item} />
          ))}
        </div>

        <h2 className="font-bold text-lg mt-7 mb-2">Categorias</h2>
        <div className="flex gap-2 flex-wrap">
          {data.categories.map((item)=>(
            <Label name={item} key={item} />
          ))}
        </div>

        <p className="mt-7 mb-2"><strong>Data de lançamento:</strong> {data.release}</p>

        <h2 className="font-bold text-lg mt-7 mb-2">Jogo recomendado:</h2>
        <div className="flex">
          <div className="flex-grow">
            <GameCard data={sortedGame} />
          </div>
        </div>
      </Container>
    </main>
  )
}
