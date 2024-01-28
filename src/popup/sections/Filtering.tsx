import TextArea from "~popup/components/TextArea"

const Filtering = () => {
  return (
    <div className="flex flex-col justify-center">

        <TextArea
        id="mutted_texts"
          label="Hide Tweets containing following texts. Enter one text per line:"
          placeholder={`Feminism\nDonald Trump\nGlobal warming effects`}
        />
    </div>
  )
}

export default Filtering
