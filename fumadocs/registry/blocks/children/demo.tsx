import { Children } from './children';

export default function Demo() {
	return (
		<div>
			<h3>Demo</h3>
			<Children name="John" age={20} getGender={() => 'Male'}>
				Always render this text
			</Children>

			<h3>Demo 2</h3>
			<Children name="Jane" age={21} getGender={() => 'Female'}>
				{({ name, age, getGender }) => (
					<div className="text-sm">
						my name is <span className="font-bold">{name} </span>
						and I am <span className="font-bold">{age} </span>
						years old and I am <span className="font-bold">{getGender()}</span>
					</div>
				)}
			</Children>
			<h3>Demo 3</h3>
			<Children name="Jane" age={21} getGender={() => 'Female'}>
				{({ name, age, getGender }) => (
					<div>
						my name is {name} and I am {age} years old and I am {getGender()}
					</div>
				)}
			</Children>
		</div>
	);
}
