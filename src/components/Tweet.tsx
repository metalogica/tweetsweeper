export default function Tweet(
  {id, content, date, source, lie } 
  :
  { 
    id: number, 
    content: string, 
    date: string,
    source: string,
    lie: boolean 
  }
) 
{
  return(
    <>
      <div data-testid='tweet'>
        <p className='date'>{date}</p>
        <p className='content'>{content}</p>  
      </div>
    </>
  )
}
