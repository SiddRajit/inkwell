import z from "zod"
import { useForm } from "@tanstack/react-form"
import { toast } from "sonner"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"

const CategoryEnum = z.enum([
  "technology",
  "design",
  "sports",
  "art",
  "politics",
  "miscellaneous",
])

const formSchema = z.object({
  title: z
    .string()
    .min(5, "Post title must be at least 5 characters")
    .max(25, "Post title mist be at most 25 characters"),
  content: z
    .string()
    .min(50, "Post title must be at least 5 characters")
    .max(500, "Post title mist be at most 25 characters"),
  category: CategoryEnum,
})

function Write() {
  const form = useForm({
    defaultValues: {
      title: "",
      content: "",
      category: "miscellaneous" as z.infer<typeof CategoryEnum>,
    },
    validators: {
      onChange: formSchema,
    },
    onSubmit: async ({ value }) => {
      toast.success("You successfully created a post")
      return value
    },
  })

  return (
    <div className="flex items-center justify-center p-4">
      <Card className="w-full sm:max-w-3xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Create Post</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            id="create-post-form"
            onSubmit={(e) => {
              e.preventDefault()
              form.handleSubmit()
            }}
          >
            <FieldGroup>
              <form.Field
                name="title"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid

                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel
                        htmlFor={field.name}
                        className="text-lg font-medium"
                      >
                        Post Title
                      </FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="Enter the title of your post..."
                        autoComplete="off"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  )
                }}
              />
              <form.Field
                name="content"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel
                        htmlFor={field.name}
                        className="text-lg font-medium"
                      >
                        Description
                      </FieldLabel>
                      <InputGroup>
                        <InputGroupTextarea
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="Enter the content of your post(min. 50 characters)..."
                          rows={6}
                          className="min-h-24 resize-none"
                          aria-invalid={isInvalid}
                        />
                        <InputGroupAddon align="block-end">
                          <InputGroupText className="tabular-nums">
                            {field.state.value.length}/500 characters
                          </InputGroupText>
                        </InputGroupAddon>
                      </InputGroup>
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  )
                }}
              />
              <form.Field
                name="category"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid

                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel
                        htmlFor={field.name}
                        className="text-lg font-medium"
                      >
                        Category
                      </FieldLabel>
                      <Select
                        value={field.state.value}
                        onValueChange={(value) =>
                          field.handleChange(
                            value as z.infer<typeof CategoryEnum>
                          )
                        }
                      >
                        <SelectTrigger
                          id={field.name}
                          onBlur={field.handleBlur}
                          className="capitalize"
                        >
                          <SelectValue placeholder="Select a category..." />
                        </SelectTrigger>
                        <SelectContent>
                          {CategoryEnum.options.map((option) => (
                            <SelectItem
                              key={option}
                              value={option}
                              className="capitalize"
                            >
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  )
                }}
              />
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter>
          <Field orientation="horizontal">
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
            >
              Reset
            </Button>
            <Button type="submit" form="bug-report-form">
              Submit
            </Button>
          </Field>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Write
