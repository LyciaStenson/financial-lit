type Props={
    placement:string
    score:number
    isUser:boolean
}

const LeaderboardEntry=({placement, score, isUser}: Props)=>{
    return(
        <div className="w-[22rem] h-14 px-5 rounded-2xl flex justify-between border-2 border-b-8 stripes stripes-size-[300px] stripes-opacity-30 stripes-white bg-moneyconf-gold py-2 text-moneyconf-purple border-moneyconf-purple">
          <h1 className="flex text-xl font-extrabold text-center">
            {placement}
          </h1>
          <h1 className="flex text-xl font-extrabold text-center">
            {score}
          </h1>
        </div>
    )
}

export default LeaderboardEntry