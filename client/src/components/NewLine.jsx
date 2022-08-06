export default function NewLine(props) {
  const repeat = props.repeat ? Number(props.repeat) : 1;
  const repeatArr = Array.from({length: repeat}, (v, i) => i);
  const repeatDiv = repeatArr.map((item) => {
    return <div className="w-flll h-2" key={item.toString()}></div>
  })

  return (
    <>
      {repeatDiv}
    </>
  )
}