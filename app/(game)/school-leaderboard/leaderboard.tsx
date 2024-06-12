type Props={
    placement:number
    name:string
    year:number
    score:number
    isUser:boolean
}

const NumberEnding=(placement:number)=>{
    return "hello";
}

const Leaderboard=({placement, name, score, year, isUser}: Props)=>{
    return(
      <div className="flex flex-row items-center justify-between space-x-2">
        <div className={"w-[70px] h-[70px] border-[2.5px] rounded-full flex items-center justify-center shadow-[inset_0_-11px_0px_rgba(0,0,0,0.3),inset_0_3px_0px_rgb(255,255,255,0.7)] stripes stripes-size-[200px] stripes-opacity-20 stripes-white bg-moneyconf-gold text-moneyconf-blue border-moneyconf-blue"}>
        <div>
          <div className="w-[50px] h-[50px] text-moneyconf-purple bg-stripes border-moneyconf-blue border-[2.5px] rounded-full flex flex-col items-center justify-center font-extrabold">
            <p className="text-xl">{placement}</p>
          </div>
        </div>
      </div>
      <div className="w-72 h-20 rounded-2xl text-center flex-row flex items-center justify-between px-4 border-2 border-b-8 stripes stripes-size-[300px] stripes-opacity-30 stripes-white bg-moneyconf-gold py-2 text-moneyconf-purple border-moneyconf-purple">
        <h1 className="text-xl font-extrabold">
          {name}
        </h1>
        <h1 className="text-xl font-extrabold">
          (yr.{year})
        </h1>
        <h1 className="text-xl font-extrabold">
          {score}
        </h1>
      </div>
    </div>
    )
}

export default Leaderboard