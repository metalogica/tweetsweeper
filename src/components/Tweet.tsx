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
      <div data-testid='tweet-panel'>
        <p data-testid='tweet-panel-date' className='date'>{date}</p>
        <p data-testid='tweet-panel-content' className='content'>{content}</p>  
      </div>
    </>
  )
}
