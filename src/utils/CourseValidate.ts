class CourseValidate {
  static courseName(courseName: string): string {
    if (courseName.length < 5 && courseName.length !== 0) {
      return "Course name must be at least 5 characters";
    } else if (courseName.length > 20) {
      return "Course name must be less than 21 characters";
    } else {
      return "";
    }
  }

  static startDate(startDate: string): string {
    if (+startDate < Date.now()) {
      return "Start date must be in the future";
    }
    return "";
  }

  static endDate(startDate: string, endDate: string): string {
    if (+startDate > +endDate) {
      return "End date must be after start date";
    }
    return "";
  }

  static time(time: string): string {
    if (time.length !== 0 && time.length !== 5) return "Wrong time format";
    return "";
  }

  static level(level: string): string {
    if (level !== "easy" && level !== "medium" && level !== "hard")
      return "Wrong value";
    return "";
  }

  static location(location: string): string {
    if (location.length < 5 && location.length !== 0) {
      return "Location must be at least 5 characters";
    } else if (location.length > 30) {
      return "Location must be less than 31 characters";
    } else {
      return "";
    }
  }

  static language(language: string): string {
    const lang = language.toLocaleLowerCase();
    if (lang !== "" && lang !== "pl" && lang !== "en") return "Wrong value";
    return "";
  }
}

export default CourseValidate;
