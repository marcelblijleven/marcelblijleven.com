export function OrderedList({children}) {
  return (
    <ol className={"list-decimal list-inside"}>{children}</ol>
  );
}

export function UnorderedList({children}) {
  return (
    <ul className={"list-disc list-inside"}>{children}</ul>
  )
}