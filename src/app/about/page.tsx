import { Avatar, AvatarFallback, AvatarImage } from '../_components/ui/avatar'


const About = () => {
    return (
            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
        )
}

export default About