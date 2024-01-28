import { IoIosArrowDown } from "react-icons/io"

const Accordion = ({ items }) => {
  return (
    <div
      id="accordion-flush"
      data-accordion="open"
      data-active-classes="bg-white text-gray-900"
      data-inactive-classes="text-gray-500">
      {items.map((item, index) => (
        <div key={item.title}>
          <h2
            className="text-base"
            id={`accordion-flush-heading-${item.title}`}>
            <button
              type="button"
              className="flex items-center justify-between w-full py-3 font-medium rtl:text-right text-gray-500 border-b border-gray-100 gap-3"
              data-accordion-target={`#accordion-flush-body-${item.title}`}
              aria-expanded={index === 0 ? "true" : "false"}
              aria-controls={`accordion-flush-body-${item.title}`}>
              <span>{item.title}</span>
              <IoIosArrowDown size={15} />
            </button>
          </h2>
          <div
            id={`accordion-flush-body-${item.title}`}
            className="hidden py-4"
            aria-labelledby={`accordion-flush-heading-${item.title}`}>
            {item.children}
          </div>
        </div>
      ))}
    </div>
  )
}

export { Accordion }
