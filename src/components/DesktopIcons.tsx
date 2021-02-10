import "./DesktopIcons.scss"

interface IconProps {
  name: string;
  url: string;
}

const Icon = ({name, url} : IconProps) => (
  <a href={url} target='_blank' className='icon' id={name} rel="noreferrer">
    <p className='icon-label'>{name}</p>
  </a>
)

export default function DesktopIcons() {
  return (
    <div className="desktop-icons-container">
      <Icon name='github' url='https://github.com/catonmat'/>
      <Icon name='stack-overflow' url='https://stackoverflow.com/users/10565289/richard-jarram'/>
      <Icon name='linkedin' url='https://www.linkedin.com/in/richardjarram/'/>
      <Icon name='twitter' url='https://twitter.com/methalogica'/>
    </div>
  )
}
