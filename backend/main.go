package main

import (
	"net/http"
	"strings"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

type Character struct {
	Name  string `json:"name"`
	Age   int    `json:"age"`
	Anime string `json:"anime"`
}

type ErrorMessage struct {
	Message string `json:"message"`
	Code    int    `json:"code"`
}

var characters = []Character{
	{
		Name:  "Yuno",
		Age:   17,
		Anime: "Black Clover",
	},
	{
		Name:  "Gon Freecss",
		Age:   12,
		Anime: "Hunter X Hunter",
	},
	{
		Name:  "Killua Zoldyck",
		Age:   12,
		Anime: "Hunter X Hunter",
	},
	{
		Name:  "Izuku Midoriya",
		Age:   16,
		Anime: "Boku no Hero Academia",
	},
}

func main() {
	e := echo.New()
	e.Use(middleware.CORS())
	e.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "Kono dio da")
	})
	e.GET("/character", func(c echo.Context) error {
		query := c.QueryParam("name")
		if query == "" {
			errorMessage := ErrorMessage{
				Message: "No name specified",
				Code:    http.StatusBadRequest,
			}
			return c.JSON(http.StatusBadRequest, errorMessage)
		}
		found := []Character{}
		for _, v := range characters {
			if strings.Contains(strings.ToLower(v.Name), strings.ToLower(query)) {
				found = append(found, v)
			}
		}
		return c.JSON(http.StatusOK, found)

	})
	e.Logger.Fatal(e.Start(":1313"))
}
