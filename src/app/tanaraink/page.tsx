import TeacherCard from "@/components/TeacherCard";

const page = () => {

  const Teachers = [
    {
      name: "Dominika",
      picture: "/girl-1.jpg",
      location: "Budapest",
      subjects: ["Matematika", "Angol"],
      isOnline: true,
      isOffline: true,
      price: ["7000", "45"],
      intro: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit itaque ratione ea temporibus iste? Laboriosam assumenda adipisci quia error? Porro, quod ab! Nesciunt optio obcaecati voluptatibus vero necessitatibus deserunt natus.",
    },
    {
      name: "Mátyás",
      picture: "/guy-1.jpg",
      location: "Budapest",
      subjects: ["Matematika", "Angol"],
      isOnline: true,
      isOffline: true,
      price: ["7000", "45"],
      intro: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit itaque ratione ea temporibus iste? Laboriosam assumenda adipisci quia error? Porro, quod ab! Nesciunt optio obcaecati voluptatibus vero necessitatibus deserunt natus.",
    },
    {
      name: "Bence",
      picture: "/guy-2.jpg",
      location: "Budapest",
      subjects: ["Matematika", "Angol"],
      isOnline: true,
      isOffline: true,
      price: ["7000", "45"],
      intro: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit itaque ratione ea temporibus iste? Laboriosam assumenda adipisci quia error? Porro, quod ab! Nesciunt optio obcaecati voluptatibus vero necessitatibus deserunt natus.",
    },
  ]
  return (
    <div className="sm:px-5 mt-10">
      <div className="mx-auto max-w-4xl sm:p-5">
        {Teachers.map((teacher, index) => (
          <TeacherCard 
            key={teacher.name}
            value={teacher}
            num={index}
          />
        ))}
      </div>
    </div>
  );
};

export default page;